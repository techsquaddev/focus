import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TimetableName } from "..";
import {
  getAllSpecs,
  getSpecificTimetable,
  updateTimetable,
} from "@/api/timetableApi";

const EditTimetable = ({ timetableId, fetchTimetable }) => {
  const [specializations, setSpecializations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [timetable, setTimetable] = useState({
    year: "",
    semester: "",
    batch: "",
    specialization: { code: "" },
    group: "",
    subGroup: "",
  });
  const [initialTimetable, setInitialTimetable] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setIsLoading(true);
        const response = await getSpecificTimetable(timetableId);
        setTimetable(response.data);
        setInitialTimetable(response.data);
      } catch (err) {
        toast.error("Failed to fetch timetable data! 😟");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetable();
  }, [timetableId]);

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
      setTimetable((prev) => ({
        ...prev,
        specialization: selectedSpec || { code: "" },
      }));
    } else {
      setTimetable((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (JSON.stringify(timetable) === JSON.stringify(initialTimetable)) {
      toast.warn("No changes made to update the timetable.");
      return;
    }

    try {
      setIsUpdating(true);
      const response = await updateTimetable(timetableId, timetable);
      toast.success("Timetable updated successfully! 🥳");
      fetchTimetable();
    } catch (err) {
      toast.error("Something went wrong! 🤨");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">Data is loading...</div>
    );
  }

  return (
    <div className="flex flex-col">
      <TimetableName timetable={timetable} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Year:</label>
          <select
            name="year"
            value={timetable.year}
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
          <label className="block mb-1">Semester:</label>
          <select
            name="semester"
            value={timetable.semester}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              Select a semester
            </option>
            <option value="S1">Semester 1</option>
            <option value="S2">Semester 2</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Batch:</label>
          <select
            name="batch"
            value={timetable.batch}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          >
            <option value="" disabled>
              Select a batch
            </option>
            <option value="WE">Weekend</option>
            <option value="WD">Weekday</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Specialization:</label>
          <select
            name="specialization"
            value={timetable.specialization._id || ""}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
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
          <label className="block mb-1">Group:</label>
          <input
            type="number"
            name="group"
            placeholder="Group? (1,2,3...)"
            value={timetable.group}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sub Group:</label>
          <input
            type="number"
            name="subGroup"
            placeholder="Sub Group? (1,2,3...)"
            value={timetable.subGroup}
            onChange={handleChange}
            className="w-full p-3 text-soft-text border text-sm border-border rounded-md md:text-base"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 w-full text-xl font-semibold bg-primary shadow-lg text-white rounded-md hover:bg-dark-blue transition-colors duration-300"
        >
          {isUpdating ? "Updating..." : "Update Timetable"}
        </button>
      </form>
    </div>
  );
};

export default EditTimetable;
