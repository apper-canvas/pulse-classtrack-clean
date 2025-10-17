import { getApperClient } from "@/services/apperClient";

export const getStudents = async () => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.fetchRecords('student_c', {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "email_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "class_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "photo_c" } },
        { field: { Name: "enrollment_date_c" } },
        { field: { Name: "parent_contact_name_c" } },
        { field: { Name: "parent_contact_phone_c" } },
        { field: { Name: "parent_contact_email_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("Error fetching students:", error?.response?.data?.message || error);
    return [];
  }
};

export const getStudentById = async (id) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.getRecordById('student_c', id, {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "first_name_c" } },
        { field: { Name: "last_name_c" } },
        { field: { Name: "email_c" } },
        { field: { Name: "phone_c" } },
        { field: { Name: "grade_level_c" } },
        { field: { Name: "class_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "photo_c" } },
        { field: { Name: "enrollment_date_c" } },
        { field: { Name: "parent_contact_name_c" } },
        { field: { Name: "parent_contact_phone_c" } },
        { field: { Name: "parent_contact_email_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching student ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const createStudent = async (studentData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Name: studentData.Name || `${studentData.first_name_c} ${studentData.last_name_c}`,
        first_name_c: studentData.first_name_c,
        last_name_c: studentData.last_name_c,
        email_c: studentData.email_c,
        phone_c: studentData.phone_c,
        grade_level_c: studentData.grade_level_c ? parseInt(studentData.grade_level_c) : null,
        class_c: studentData.class_c,
        status_c: studentData.status_c,
        photo_c: studentData.photo_c,
        enrollment_date_c: studentData.enrollment_date_c,
        parent_contact_name_c: studentData.parent_contact_name_c,
        parent_contact_phone_c: studentData.parent_contact_phone_c,
        parent_contact_email_c: studentData.parent_contact_email_c
      }]
    };

    const response = await apperClient.createRecord('student_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create student:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error creating student:", error?.response?.data?.message || error);
    return null;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Id: id,
        Name: studentData.Name || `${studentData.first_name_c} ${studentData.last_name_c}`,
        first_name_c: studentData.first_name_c,
        last_name_c: studentData.last_name_c,
        email_c: studentData.email_c,
        phone_c: studentData.phone_c,
        grade_level_c: studentData.grade_level_c ? parseInt(studentData.grade_level_c) : null,
        class_c: studentData.class_c,
        status_c: studentData.status_c,
        photo_c: studentData.photo_c,
        enrollment_date_c: studentData.enrollment_date_c,
        parent_contact_name_c: studentData.parent_contact_name_c,
        parent_contact_phone_c: studentData.parent_contact_phone_c,
        parent_contact_email_c: studentData.parent_contact_email_c
      }]
    };

    const response = await apperClient.updateRecord('student_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update student:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error updating student:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteStudent = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const response = await apperClient.deleteRecord('student_c', {
      RecordIds: [id]
    });

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete student:`, failed);
        return false;
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting student:", error?.response?.data?.message || error);
    return false;
  }
};