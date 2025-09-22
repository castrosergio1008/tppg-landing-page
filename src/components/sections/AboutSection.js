import { useState } from "react";
import { useRouter } from "next/router";


export default function AboutSection() {
     const router = useRouter();

  // Form state
  const initialState = {
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
    quoteFiles: [],
    acceptTerms: false,
    fileErrors: [], // Added fileErrors to initial state
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileErrors, setFileErrors] = useState([]);

  // Form functions
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const newFileErrors = [];
      const currentFiles = Array.from(formData.quoteFiles); // Get current valid files

      Array.from(files).forEach((file) => {
        if (file.type !== "application/pdf") {
          newFileErrors.push(`File "${file.name}" is not a PDF.`);
        } else if (file.size > 10 * 1024 * 1024) {
          newFileErrors.push(`File "${file.name}" exceeds the maximum size of 10MB.`);
        } else {
          currentFiles.push(file); // Add valid files to the list
        }
      });

      setFormData((prev) => ({
        ...prev,
        [name]: currentFiles, // Update with all valid files
      }));
      setFileErrors(newFileErrors); // Set file-specific errors
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error when user corrects
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll to first error
      const firstErrorElement = document.querySelector(".border-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Create FormData to send files
      const submitFormData = new FormData();

      // Add text fields
      Object.keys(formData).forEach((key) => {
        if (key !== "quoteFiles") {
          submitFormData.append(key, formData[key]);
        }
      });

      // Add files
      formData.quoteFiles.forEach((file) => {
        submitFormData.append("quoteFiles", file);
      });

      // Send to API
      const response = await fetch("/api/leads", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error submitting the form");
      }

      // Success: redirect to thank you page
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        general:
          "There was an error submitting the form. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Ready to renovate your space?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Tell us about your painting project and we will contact you to
                  schedule a free visit.
                </p>
                <div className="bg-gradient-to-r from-[#7ED957]/10 to-[#082A37]/5 border-2 border-[#7ED957] rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl mr-3">💰</span>
                    <h3 className="text-2xl font-bold text-[#082A37]">
                      We guarantee to beat any quote!
                    </h3>
                  </div>
                  <div className="text-left space-y-3 text-[#082A37]">
                    <div className="flex items-center">
                      <span className="text-[#7ED957] mr-2">✓</span>
                      <span>
                        <strong>Already have quotes?</strong> Attach them and
                        we guarantee to beat the price while maintaining the same
                        quality.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#7ED957] mr-2">✓</span>
                      <span>
                        <strong>Free analysis:</strong> We review your
                        project and optimize costs without compromising results.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#7ED957] mr-2">✓</span>
                      <span>
                        <strong>Guaranteed final price:</strong> We don&apos;t charge
                        hidden extras, the price we quote is the price you pay.
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-lg font-semibold text-[#082A37]">
                      📋{" "}
                      <em>
                        Send your current quotes and find out how much you can
                        save.
                      </em>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        placeholder="you@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <span className="mr-1">⚠️</span>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="serviceType"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Service Type *
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                        errors.serviceType
                          ? "border-red-500"
                          : "border-gray-300"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="">Select a service type</option>
                      <option value="interior">Interior Painting</option>
                      <option value="exterior">Exterior Painting</option>
                      <option value="commercial">Commercial Painting</option>
                      <option value="maintenance">
                        Painting Maintenance
                      </option>
                      <option value="other">Other</option>
                    </select>
                    {errors.serviceType && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.serviceType}
                      </p>
                    )}
                  </div>

                  
                  <div className="mt-6">
                    <label
                      htmlFor="quoteFiles"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Current Quotes (optional) 📋
                      <span className="text-sm font-normal text-gray-500 block mt-1">
                        Attach quotes from other providers to guarantee a better
                        offer.
                      </span>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed border-gray-200"
                          : "border-gray-300 hover:border-[#7ED957]"
                      }`}
                    >
                      <input
                        type="file"
                        id="quoteFiles"
                        name="quoteFiles"
                        onChange={handleChange}
                        multiple
                        accept=".pdf"
                        disabled={isSubmitting}
                        className="hidden"
                      />
                      <label
                        htmlFor="quoteFiles"
                        className={`cursor-pointer flex flex-col items-center ${
                          isSubmitting ? "cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="text-4xl text-gray-400 mb-2">📄</div>
                        <p className="text-gray-600 font-medium">
                          Click to select PDF files
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Maximum 10MB per file
                        </p>
                      </label>

                      {formData.quoteFiles.length > 0 && (
                        <div className="mt-4 text-left">
                          <p className="text-sm text-gray-700 font-medium mb-2">
                            Selected files:
                          </p>
                          {formData.quoteFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded mb-1"
                            >
                              <span className="text-sm text-gray-700 truncate">
                                📄 {file.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {fileErrors.length > 0 && (
                        <div className="mt-2 text-red-500 text-sm">
                          {fileErrors.map((error, index) => (
                            <p key={index} className="flex items-center">
                              <span className="mr-1">⚠️</span> {error}
                            </p>
                          ))}
                        </div>
                      )}
                      {fileErrors.length > 0 && (
                        <div className="mt-2 text-red-500 text-sm">
                          {fileErrors.map((error, index) => (
                            <p key={index} className="flex items-center">
                              <span className="mr-1">⚠️</span> {error}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      💡 <strong>Tip:</strong> Sending existing quotes helps us
                      offer you a better price and service.
                    </div>
                  </div>
                  <div className="mt-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows="5"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] resize-none bg-white text-gray-800 transition-colors ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="Describe your project: size of the house/office, preferred colors, estimated dates, etc."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`mt-1 mr-3 h-4 w-4 text-[#7ED957] transition-colors ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      />
                      <span className="text-sm text-gray-700">
                        I accept the terms and conditions and authorize the
                        processing of my data to receive information about
                        painting services *
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>

                  
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mt-6 flex items-center">
                      <span className="mr-2">⌘</span>
                      {errors.general}
                    </div>
                  )}

                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#082A37] hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending request...
                        </span>
                      ) : (
                        "Request a Free Quote"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
  );
}