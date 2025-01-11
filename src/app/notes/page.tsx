"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import showdown from "showdown";
import jsPDF from "jspdf";
import useAuthStore from "@/store/Auth";

export default function NotesPage() {
    const {user} = useAuthStore(); // Use the useAuth hook to access user
    const [markdown, setMarkdown] = useState("");
    const [html, setHtml] = useState("");
    const [viewMode, setViewMode] = useState("markdown"); // 'markdown', 'html', 'pdf'

    const handleMarkdownChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const newMarkdown = event.target.value;
        setMarkdown(newMarkdown);
        setHtml(convertMarkdownToHtml(newMarkdown));
    };

    const convertMarkdownToHtml = (markdownText: string) => {
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

    // If the user is not logged in, show the restricted access message
    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-white bg-gray-900">
                <h2 className="mb-4 text-3xl font-bold">Access Restricted</h2>
                <p className="mb-6 text-lg text-gray-400">
                    You need to <a href="/login">log in</a> to view your profile.
                    <br/>
                    <button
                        className="py-3 px-6 text-lg font-semibold text-blue-200 bg-white rounded-lg shadow-md hover:text-blue-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        <a href="/login">Log In</a>
                    </button>
                </p>
            </div>
        );
    }

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
                <div dangerouslySetInnerHTML={{__html: html}}/>
            )}

            {viewMode === "pdf" && (
                <Button onClick={handleDownloadPdf}>Download PDF</Button>
            )}
        </div>
    );
}
