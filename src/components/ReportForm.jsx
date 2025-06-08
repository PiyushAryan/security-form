import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-hot-toast";
import { Bug, SendHorizontal, Forward, Copy, Check, Sun, Moon} from "lucide-react";

export default function ReportForm() {
    const IssueID = `VX-${nanoid(5)}`;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [copied, setCopied] = useState(false);
    const [errors, setErrors] = useState({});
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const userErrors = {};
        if (!title.trim()) {
            userErrors.title = "Vulnerability title is required";
        }
        else if (title.trim().length < 5) {
            userErrors.title = "Title must be at least 5 characters long";
        }

        if (!description.trim()) {
            userErrors.description = "Provide a description of the vulnerability";
        }
        else if (description.trim().length < 5) {
            userErrors.description = "Description must be at least 5 characters long";
        }
        setErrors(userErrors);

        if (Object.keys(userErrors).length === 0) {
            console.log({ title, description, IssueID });
            toast.success(`Issue reported successfully: ${title} + Issue ID ${IssueID}`, {
                duration: 3000,
            });
            setTitle("");
            setDescription("");


        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(IssueID);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-8">
        
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-red-500 rounded-md">
                        <Bug className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Submit a Security Vulnerability
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Help us understand the security issue by filling in the details below.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            <div className="flex justify-between items-center">
                                <span>
                                    Vulnerability Title <span className="text-red-500">*</span>
                                </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-slate-300 font-mono text-xs">
                                        Issue Ref: {IssueID}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        type="button"
                                        className="hover:text-blue-500"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    {copied && (
                                        <span className="text-green-400 text-xs ml-1"><Check w-4 h-4 /></span>
                                    )}
                                </div>
                            </div>
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="e.g., XSS Vulnerability in Login Form"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`mt-1 w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${errors.title
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                }`}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description (Markdown supported) <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 rounded-md border dark:border-gray-600 overflow-hidden">
                            <MDEditor
                                value={description}
                                onChange={setDescription}
                                height={300}
                                previewOptions={{
                                    className: "bg-white dark:bg-gray-800 dark:text-gray-100",
                                }}
                            />
                        </div>
                        {errors.description && (
                            <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition duration-200 flex items-center justify-center space-x-2"
                        >
                            <Forward size={24} />
                            <span>Submit Report</span>
                        </button>
                    </div>
                </form>
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center">
                All reports are treated confidentially.
                dark mode is enabled by default.
            </p>
        </div>
    );
}
