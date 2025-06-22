import { useState, useEffect } from 'react';
import { Shield, Copy, Check, AlertTriangle, Mail, Globe, FileText, Info } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import { LuMoon, LuSun } from "react-icons/lu";
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';



const vulTypes = [
    { label: 'SQL Injection', value: 'sql_injection' },
    { label: 'Cross-Site Scripting (XSS)', value: 'xss  ' },
    { label: 'Cross-Site Request Forgery (CSRF)', value: 'csrf' },
    { label: 'Remote Code Execution (RCE)', value: 'rce' },
    { label: 'Server-Side Request Forgery (SSRF)', value: 'ssrf' },
    { label: 'Information Disclosure', value: 'info_disclosure' },
    { label: 'Denial of Service (DoS)', value: 'dos' },
    { label: 'Authentication Bypass', value: 'auth_bypass' },
    { label: 'Privilege Escalation', value: 'privilege_escalation' },
    { label: 'Other', value: 'other' }
];

const ReportForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        vulType: '',
        title: '',
        affectedUrl: '',
        stepsToReproduce: `### Steps to Reproduce

1. Navigate to \`https://example.com/login\`.
2. Open Developer Tools and go to the **Console** tab.
3. Paste the following payload into the input field:
   \`\`\`html
   <script>alert('XSS');</script>
   \`\`\`
4. Submit the form.
5. Observe the JavaScript alert — indicating a stored XSS vulnerability.
`,
        potentialImpact: '',
        consent: false,
        severity: ''
    });

    const [errors, setErrors] = useState({});
    const [theme, setTheme] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [referenceId, setReferenceId] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const id = `aud1t-${nanoid(5).toUpperCase()}`;
        setReferenceId(id);

    }, []);

    useEffect(() => {
        if (theme === 'dark') {

            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const validateField = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) return 'Email is required';
                if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address';
                }
                break;
            case 'vulType':
                if (!value) return 'Please select a vulnerability type';
                break;
            case 'title':
                if (!value) return 'Title is required';
                if (typeof value === 'string' && value.length < 5) {
                    return 'Title must be at least 5 characters long';
                }
                break;
            case 'affectedUrl':
                if (!value) return 'Affected URL/Endpoint is required';
                break;
            case 'consent':
                if (!value) return 'You must agree to the responsible disclosure policy';
                break;
            default:
                return undefined;
        }
    };

    const handleInputChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleBlur = (name) => {
        const value = formData[name];
        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'potentialImpact') {
                const error = validateField(key, value);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please fix the errors before submitting');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success(`Issue submitted successfully! Reference ID: ${referenceId}`, {
                duration: 5000,
                icon: '✅'
            });

            setFormData({
                severity: '',
                email: '',
                vulType: '',
                title: '',
                affectedUrl: '',
                stepsToReproduce: '',
                potentialImpact: '',

                consent: false
            });

            const newId = `aud1t-${nanoid(5).toUpperCase()}`;
            setReferenceId(newId);

        } catch (error) {
            toast.error('Failed to submit report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyReferenceId = async () => {
        try {
            await navigator.clipboard.writeText(referenceId);
            setCopied(true);
            toast.success('Reference ID copied');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy reference ID');
        }
    };

    return (
        <>
            <div className="flex justify-end px-4">
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-3 rounded-full bg-slate-800 dark:bg-slate-400 text-yellow-400 dark:text-slate-800 text-2xl shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300"
                    aria-label="Toggle theme"
                >
                    <span
                        className={`inline-block transition-transform duration-300 ease-in-out ${theme === "dark" ? "rotate-0" : "rotate-180"
                            }`}
                    >
                        {theme === "dark" ? <LuMoon /> : <LuSun />}
                    </span>
                </button>
            </div>


            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Shield className="w-8 h-8 text-blue-400 mr-3" />
                        <h1 className="text-3xl font-bold text-slate-700 dark:text-white">Vulnerability Disclosure</h1>
                    </div>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Help us keep our platform secure by reporting vulnerabilities responsibly.
                        Your findings are valuable and will be reviewed by our security team.
                    </p>
                </div>

                <div className="dark:bg-slate-800 bg-slate-200 rounded-lg p-4 mb-6 border border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-medium dark:text-slate-300 text-slate-600">Reference ID</label>
                            <p className="text-lg font-mono dark:text-white text-slate-500">{referenceId}</p>
                        </div>
                        <button
                            onClick={copyReferenceId}
                            className="flex items-center space-x-2 px-3 py-2 bg-slate-400 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition-colors"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                                <Copy className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                            )}
                            <span className="text-sm text-slate-500 dark:text-slate-300">
                                {copied ? 'Copied!' : 'Copy'}
                            </span>
                        </button>
                    </div>
                </div>


                <form onSubmit={handleSubmit} className="bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-700">
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="flex items-center text-sm font-medium text-slate-600  dark:text-slate-300 mb-2">
                                <Shield className="w-4 h-4 mr-2" />
                                Severity <span className="text-slate-600 dark:text-slate-500 ml-1">(Optional)</span>
                            </label>
                            <div className="flex gap-4">
                                {['Low', 'Medium', 'High', 'Critical', 'None'].map((level) => (
                                    <label key={level} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                        <input
                                            type="radio"
                                            name="severity"
                                            value={level.toLowerCase()}
                                            checked={formData.severity === level.toLowerCase()}
                                            onChange={(e) => handleInputChange('severity', e.target.value)}
                                            className="w-4 h-4 text-blue-600 bg-slate-400 dark:bg-slate-700 border-slate-600 focus:ring-blue-500"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                            <p className="text-slate-500 text-sm mt-1">
                                Estimate the severity of this issue.
                            </p>
                        </div>


                        <div>
                            <label htmlFor="email" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                                <Mail className="w-4 h-4 mr-2" />
                                Your Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                onBlur={() => handleBlur('email')}
                                className={`w-full px-4 py-3 bg-slate-300 dark:bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-slate-600'
                                    }`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    {errors.email}
                                </p>
                            )}
                            <p className="text-slate-500 text-sm mt-1">
                                We'll use this email to contact you about your report
                            </p>
                        </div>

                        <div>
                            <label htmlFor="vulType" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                                <FileText className="w-4 h-4 mr-2" />
                                Vulnerability Type *
                            </label>
                            <select
                                id="vulType"
                                value={formData.vulType}
                                onChange={(e) => handleInputChange('vulType', e.target.value)}
                                onBlur={() => handleBlur('vulType')}
                                className={`w-full px-4 py-3 bg-slate-300 dark:bg-slate-700 border rounded-lg text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.vulType ? 'border-red-500' : 'border-slate-600'
                                    }`}
                            >
                                {vulTypes.map((type) => (
                                    <option key={type.value} value={type.value} className="bg-slate-200 dark:bg-slate-700">
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            {errors.vulType && (
                                <p className="text-red-400 text-sm mt-1 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    {errors.vulType}
                                </p>
                            )}
                        </div>



                        {/* Vulnerability Title */}
                        <div>
                            <label htmlFor="title" className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">
                                Vulnerability Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                onBlur={() => handleBlur('title')}
                                className={`w-full px-4 py-3 bg-slate-300 dark:bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.title ? 'border-red-500' : 'border-slate-600'
                                    }`}
                                placeholder="Brief, descriptive title of the vulnerability"
                            />
                            {errors.title && (
                                <p className="text-red-400 text-sm mt-1 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    {errors.title}
                                </p>
                            )}
                            <p className="text-slate-500 text-sm mt-1">
                                Minimum 5 characters. Be specific and descriptive.
                            </p>
                        </div>

                        {/* Affected URL/Endpoint */}
                        <div>
                            <label htmlFor="affectedUrl" className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                                <Globe className="w-4 h-4 mr-2" />
                                Affected URL/Endpoint *
                            </label>
                            <input
                                type="url"
                                id="affectedUrl"
                                value={formData.affectedUrl}
                                onChange={(e) => handleInputChange('affectedUrl', e.target.value)}
                                onBlur={() => handleBlur('affectedUrl')}
                                className={`w-full px-4 py-3 bg-slate-300 dark:bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.affectedUrl ? 'border-red-500' : 'border-slate-600'
                                    }`}
                                placeholder="https://aud1t.com/vulnerable-endpoint"
                            />
                            {errors.affectedUrl && (
                                <p className="text-red-400 text-sm mt-1 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    {errors.affectedUrl}
                                </p>
                            )}
                            <p className="text-slate-500 text-sm mt-1">
                                The specific URL or API endpoint where the vulnerability exists
                            </p>
                        </div>


                        <div>
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">
                                Steps to Reproduce *
                            </label>
                            <div className="rounded-lg overflow-hidden border border-slate-600 bg-slate-100 dark:bg-slate-700">
                                <MDEditor
                                    value={formData.stepsToReproduce}
                                    onChange={(value) => handleInputChange('stepsToReproduce', value || '')}
                                    preview="edit"
                                    hideToolbar={false}
                                    height={200}
                                    data-color-mode={theme === "dark" ? "dark" : "light"} // this switches the editor theme
                                    className="!bg-slate-100 dark:!bg-slate-700 !text-black dark:!text-white !border-none"
                                />
                            </div>

                            <p className="text-slate-500 text-sm mt-1">
                                Provide detailed, step-by-step instructions. Use markdown formatting for clarity.
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">
                                Upload Proof of Concept Video <span className="text-slate-500 ml-1">(Optional)</span>
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleInputChange('videoFile', e.target.files?.[0] || null)}
                                className="w-full px-4 py-2 bg-slate-300 dark:bg-slate-700 text-white border border-slate-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
                            />
                            <p className="text-slate-500 text-sm mt-1">
                                Upload a short screen recording or demo showing the bug reproduction steps.
                            </p>
                        </div>


                        <div>
                            <label className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                                <Info className="w-4 h-4 mr-2" />
                                Potential Impact
                                <span className="text-slate-500 ml-1">(Optional)</span>
                            </label>
                            <textarea
                                value={formData.potentialImpact}
                                onChange={(e) => handleInputChange('potentialImpact', e.target.value)}
                                className="w-full px-4 py-3  bg-slate-300 dark:bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                                rows={4}
                                placeholder="Describe the potential impact of this vulnerability..."
                            />
                            <p className="text-slate-500 text-sm mt-1">
                                Explain what an attacker could achieve by exploiting this vulnerability
                            </p>
                        </div>


                        <div>
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.consent}
                                    onChange={(e) => handleInputChange('consent', e.target.checked)}
                                    className="mt-1 w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <div>
                                    <span className="text-slate-600 dark:text-slate-300">
                                        I agree to the responsible disclosure policy *
                                    </span>
                                    <p className="text-slate-500 text-sm mt-1">
                                        By checking this box, you agree to follow responsible disclosure practices and not to publicly disclose this vulnerability until it has been addressed.
                                    </p>
                                </div>
                            </label>
                            {errors.consent && (
                                <p className="text-red-400 text-sm mt-2 flex items-center">
                                    <AlertTriangle className="w-4 h-4 mr-1" />
                                    {errors.consent}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="px-6 py-4 bg-slate-750 border-t border-slate-700 rounded-b-lg">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-600 dark:text-slate-400  text-sm">
                                For encrypted reports, use our <a className='text-blue-700' href='#'>PGP Key</a>.
                            </p>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Shield className="w-4 h-4" />
                                        <span>Submit Report</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ReportForm;
