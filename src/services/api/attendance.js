import { getApperClient } from "@/services/apperClient";

export const getAttendance = async () => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.fetchRecords('attendance_c', {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "date_c" } },
        { field: { Name: "notes_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "student_id_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("Error fetching attendance:", error?.response?.data?.message || error);
    return [];
  }
};

export const getAttendanceById = async (id) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.getRecordById('attendance_c', id, {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "date_c" } },
        { field: { Name: "notes_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "student_id_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching attendance ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const getAttendanceByStudentId = async (studentId) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.fetchRecords('attendance_c', {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "date_c" } },
        { field: { Name: "notes_c" } },
        { field: { Name: "status_c" } },
        { field: { Name: "student_id_c" } }
      ],
      where: [
        {
          FieldName: "student_id_c",
          Operator: "EqualTo",
          Values: [parseInt(studentId)]
        }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching attendance for student ${studentId}:`, error?.response?.data?.message || error);
    return [];
  }
};

export const createAttendance = async (attendanceData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Name: attendanceData.Name || `Attendance - ${attendanceData.date_c}`,
        date_c: attendanceData.date_c,
        notes_c: attendanceData.notes_c,
        status_c: attendanceData.status_c,
        student_id_c: attendanceData.student_id_c ? parseInt(attendanceData.student_id_c) : null
      }]
    };

    const response = await apperClient.createRecord('attendance_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create attendance:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error creating attendance:", error?.response?.data?.message || error);
    return null;
  }
};

export const updateAttendance = async (id, attendanceData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Id: id,
        Name: attendanceData.Name || `Attendance - ${attendanceData.date_c}`,
        date_c: attendanceData.date_c,
        notes_c: attendanceData.notes_c,
        status_c: attendanceData.status_c,
        student_id_c: attendanceData.student_id_c ? parseInt(attendanceData.student_id_c) : null
      }]
    };

    const response = await apperClient.updateRecord('attendance_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update attendance:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error updating attendance:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteAttendance = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const response = await apperClient.deleteRecord('attendance_c', {
      RecordIds: [id]
    });

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete attendance:`, failed);
        return false;
      }
      return true;
    }

return false;
  } catch (error) {
    console.error("Error deleting attendance:", error?.response?.data?.message || error);
    return false;
  }
};