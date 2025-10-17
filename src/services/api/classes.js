import { getApperClient } from "@/services/apperClient";

export const getClasses = async () => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.fetchRecords('class_c', {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "name_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "teacher_c" } },
        { field: { Name: "schedule_c" } },
        { field: { Name: "room_c" } },
        { field: { Name: "capacity_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("Error fetching classes:", error?.response?.data?.message || error);
    return [];
  }
};

export const getClassById = async (id) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.getRecordById('class_c', id, {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "name_c" } },
        { field: { Name: "subject_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "teacher_c" } },
        { field: { Name: "schedule_c" } },
        { field: { Name: "room_c" } },
        { field: { Name: "capacity_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching class ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const createClass = async (classData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Name: classData.Name || classData.name_c,
        name_c: classData.name_c,
        subject_c: classData.subject_c,
        grade_level_c: classData.grade_level_c ? parseInt(classData.grade_level_c) : null,
        teacher_c: classData.teacher_c,
        schedule_c: classData.schedule_c,
        room_c: classData.room_c,
        capacity_c: classData.capacity_c ? parseInt(classData.capacity_c) : null
      }]
    };

    const response = await apperClient.createRecord('class_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create class:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error creating class:", error?.response?.data?.message || error);
    return null;
  }
};

export const updateClass = async (id, classData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Id: id,
        Name: classData.Name || classData.name_c,
        name_c: classData.name_c,
        subject_c: classData.subject_c,
        grade_level_c: classData.grade_level_c ? parseInt(classData.grade_level_c) : null,
        teacher_c: classData.teacher_c,
        schedule_c: classData.schedule_c,
        room_c: classData.room_c,
        capacity_c: classData.capacity_c ? parseInt(classData.capacity_c) : null
      }]
    };

    const response = await apperClient.updateRecord('class_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update class:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error updating class:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteClass = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const response = await apperClient.deleteRecord('class_c', {
      RecordIds: [id]
    });

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete class:`, failed);
        return false;
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting class:", error?.response?.data?.message || error);
    return false;
  }
};