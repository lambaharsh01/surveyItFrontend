import { useState } from "react";
import { motion } from "framer-motion";

export default function RespondentDetails() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
  });

  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
  const designations = ["Manager", "Team Lead", "Developer", "Analyst", "Intern"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl 2xl:max-w-none mx-auto px-4 py-6 bg-gradient-to-br from-white to-gray-100 shadow-lg border border-gray-200"
    >
      <h1 className="text-3xl font-bold text-center text-gray-900 border-b-4 border-gray-500 pb-3 mb-8">
        Respondent Details
      </h1>

      <motion.div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Department</label>
          <select
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Designation</label>
          <select
            value={formData.designation}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="">Select Designation</option>
            {designations.map((desig, index) => (
              <option key={index} value={desig}>
                {desig}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.button
        onClick={handleSubmit}
        className="mt-6 w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 text-lg font-semibold hover:from-gray-800 hover:to-gray-600 transition-all shadow-md"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit
      </motion.button>
    </motion.div>
  );
}
