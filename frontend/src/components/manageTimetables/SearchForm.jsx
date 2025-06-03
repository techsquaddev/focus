import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { findTimetable, getAllSpecs } from "@/api/timetableApi";
import { TimetableName } from "..";

const SearchForm = () => {
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    semester: "",
    batch: "",
    specialization: { code: "" },
    group: "",
    subGroup: "",
  });
  const navigate = useNavigate();

  // Fetch specializations on component mount
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSpecs();
        setSpecializations(response.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpecializations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "specialization") {
      const selectedSpec = specializations.find((spec) => spec._id === value);
      setFormData((prevData) => ({
        ...prevData,
        specialization: selectedSpec || { code: "" },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsFinding(true);
      const response = await findTimetable(formData);
      if (response.data) {
        toast.success("Timetable Found! 🥳");

        setFormData({
          year: "",
          semester: "",
          batch: "",
          specialization: { code: "" },
          group: "",
          subGroup: "",
        });

        // Redirect to the sessions page
        navigate(`/dashboard/timetables/${response.data._id}/sessions`);
      } else {
        toast.info("Couldn't find the timetable! 🤷");
      }
    } catch (error) {
      toast.error("Error finding timetable 😕");
    } finally {
      setIsFinding(false);
    }
  };

  return (
    <div>
      <TimetableName timetable={formData} />
      <div className="flex flex-col">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
              required
            >
              <option value="" disabled>
                Select a year
              </option>
              <option value="Y1">Year 1</option>
              <option value="Y2">Year 2</option>
              <option value="Y3">Year 3</option>
              <option value="Y4">Year 4</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            >
              <option value="" disabled>
                Select a Semester
              </option>
              <option value="S1">Semester 1</option>
              <option value="S2">Semester 2</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            >
              <option value="" disabled>
                Select a batch
              </option>
              <option value="WE">Weekend</option>
              <option value="WD">Weekday</option>
            </select>
          </div>
          <div className="mb-4">
            <select
              name="specialization"
              value={formData.specialization._id || ""}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            >
              <option value="" disabled>
                {isLoading
                  ? "Loading specializations..."
                  : "Select a specialization"}
              </option>
              {specializations.length > 0 ? (
                specializations.map((specialization) => (
                  <option key={specialization._id} value={specialization._id}>
                    {specialization.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No specializations available
                </option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="group"
              placeholder="Group? (1,2,3...)"
              value={formData.group}
              onChange={handleChange}
              required
              className="w-full p-3 text-soft-text border text-sm border-border rounded md:text-base"
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="subGroup"
              placeholder="Sub group? (1,2,3...)"
              value={formData.subGroup}
              onChange={handleChange}
              className="w-full p-3 text-soft-text border text-sm border-border rounded md:text-base"
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 w-full text-xl font-semibold bg-primary shadow-lg text-white rounded-md hover:bg-dark-blue transition-colors duration-300"
            >
              {isFinding ? "Finding..." : "Find My Timetable"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
