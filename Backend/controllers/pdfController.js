import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDF from "../models/PDF.js";
import {
  addPDFToVectorStore,
  removePDFFromVectorStore,
} from "../utils/ragService.js";
import { extractTextFromFile } from "../utils/fileExtractor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");

const vectorstoreDir = path.join(__dirname, "../vectorstore");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, {
    recursive: true,
  });
}

if (!fs.existsSync(vectorstoreDir)) {
  fs.mkdirSync(vectorstoreDir, {
    recursive: true,
  });
}

/**

* POST /api/pdf/upload
  */
export const uploadPDFs = async (req, res) => {
  try {
    console.log("📥 Upload request received");

    console.log("Files:", req.files?.length ?? 0);

    console.log("User:", req.user?._id);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded. Please select at least one file.",
      });
    }

    const uploadedPDFs = [];
    const errors = [];

    for (const file of req.files) {
      try {
        console.log(`📄 Processing: ${file.originalname}`);

        console.log(`Size: ${file.size} bytes`);

        if (!fs.existsSync(file.path)) {
          errors.push(`${file.originalname}: File not found after upload.`);

          continue;
        }

        let fileData;

        try {
          fileData = await extractTextFromFile(file);

          console.log(`Pages: ${fileData.pages}`);

          console.log(`Text Length: ${fileData.text?.length}`);
        } catch (parseErr) {
          console.error(`Parse Error:`, parseErr.message);

          errors.push(`${file.originalname}: ${parseErr.message}`);

          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }

          continue;
        }

        const extractedText = fileData.text;

        if (!extractedText || extractedText.trim().length < 10) {
          errors.push(
            `${file.originalname}: File contains little or no readable text.`,
          );

          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }

          continue;
        }
const pdf = await PDF.create({
  userId: req.user._id,
  fileName: file.filename,
  originalName: file.originalname,
  filePath: file.path,
  extractedText,
  fileSize: file.size,
  pageCount: fileData.pages,
});

        console.log(`Saved to MongoDB: ${pdf._id}`);

        await addPDFToVectorStore(
          req.user._id.toString(),
          extractedText,
          pdf._id.toString(),
          file.originalname,
          extractedText,
        );

        console.log("✅ Indexed in FAISS");

        uploadedPDFs.push({
          id: pdf._id,
          originalName: pdf.originalName,
          fileSize: pdf.fileSize,
          pageCount: pdf.pageCount,
          uploadedAt: pdf.uploadedAt,
        });
      } catch (fileError) {
        console.error(`❌ Error processing ${file.originalname}:`, fileError);

        errors.push(`${file.originalname}: ${fileError.message}`);

        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    if (uploadedPDFs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files were processed successfully.",
        errors,
      });
    }

    res.status(201).json({
      success: true,
      message: `${uploadedPDFs.length} file(s) uploaded and indexed successfully.`,
      files: uploadedPDFs,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);

    res.status(500).json({
      success: false,
      message: `Upload failed: ${error.message}`,
    });
  }
};

/**

* GET /api/pdf/list
  */
export const getUserPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find({
      userId: req.user._id,
    })
      .sort({
        uploadedAt: -1,
      })
      .select("originalName fileSize pageCount uploadedAt");

    res.json({
      success: true,
      count: pdfs.length,
      pdfs,
    });
  } catch (error) {
    console.error("List Files Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve file list.",
    });
  }
};

/**

* DELETE /api/pdf/:id
  */
export const deletePDF = async (req, res) => {
  try {
    const pdf = await PDF.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "File not found or permission denied.",
      });
    }

    if (fs.existsSync(pdf.filePath)) {
      fs.unlinkSync(pdf.filePath);
    }

    await removePDFFromVectorStore(req.user._id.toString(), pdf._id.toString());

    await PDF.findByIdAndDelete(pdf._id);

    res.json({
      success: true,
      message: `"${pdf.originalName}" deleted successfully.`,
    });
  } catch (error) {
    console.error("Delete File Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete file.",
    });
  }
};
