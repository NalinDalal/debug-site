"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import showdown from "showdown";
import jsPDF from "jspdf";

export default function NotesPage() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [viewMode, setViewMode] = useState("markdown"); // 'markdown', 'html', 'pdf'

  const handleMarkdownChange = (event) => {
    const newMarkdown = event.target.value;
    setMarkdown(newMarkdown);
    setHtml(convertMarkdownToHtml(newMarkdown));
  };

  const convertMarkdownToHtml = (markdownText) => {
    // Use a client-side library to convert Markdown to HTML
    // For example, using Showdown.js
    const converter = new showdown.Converter();
    return converter.makeHtml(markdownText);
  };

  const handleDownloadPdf = () => {
    // Implement PDF generation and download
    // For example, using jsPDF
    const doc = new jsPDF();
    doc.text(html, 10, 10);
    doc.save("note.pdf");
  };

  return (
    <div>
      <Button onClick={() => setViewMode("markdown")}>Markdown</Button>
      <Button onClick={() => setViewMode("html")}>HTML</Button>
      <Button onClick={() => setViewMode("pdf")}>PDF</Button>

      {viewMode === "markdown" && (
        <Textarea
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Enter Markdown here..."
        />
      )}

      {viewMode === "html" && (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}

      {viewMode === "pdf" && (
        <Button onClick={handleDownloadPdf}>Download PDF</Button>
      )}
    </div>
  );
}
