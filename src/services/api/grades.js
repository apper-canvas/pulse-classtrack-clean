import { getApperClient } from "@/services/apperClient";

export const getGrades = async () => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.fetchRecords('grade_c', {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "assignment_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "max_score_c" } },
        { field: { Name: "score_c" } },
        { field: { Name: "student_id_c" } },
        { field: { Name: "subject_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return response.data || [];
  } catch (error) {
    console.error("Error fetching grades:", error?.response?.data?.message || error);
    return [];
  }
};

export const getGradeById = async (id) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.getRecordById('grade_c', id, {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "assignment_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "max_score_c" } },
        { field: { Name: "score_c" } },
        { field: { Name: "student_id_c" } },
        { field: { Name: "subject_c" } }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching grade ${id}:`, error?.response?.data?.message || error);
    return null;
  }
};

export const getGradesByStudentId = async (studentId) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.fetchRecords('grade_c', {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "assignment_c" } },
        { field: { Name: "category_c" } },
        { field: { Name: "date_c" } },
        { field: { Name: "max_score_c" } },
        { field: { Name: "score_c" } },
        { field: { Name: "student_id_c" } },
        { field: { Name: "subject_c" } }
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
    console.error(`Error fetching grades for student ${studentId}:`, error?.response?.data?.message || error);
    return [];
  }
};

export const createGrade = async (gradeData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Name: gradeData.Name || `${gradeData.subject_c} - ${gradeData.assignment_c}`,
        assignment_c: gradeData.assignment_c,
        category_c: gradeData.category_c,
        date_c: gradeData.date_c,
        max_score_c: gradeData.max_score_c ? parseFloat(gradeData.max_score_c) : null,
        score_c: gradeData.score_c ? parseFloat(gradeData.score_c) : null,
        student_id_c: gradeData.student_id_c ? parseInt(gradeData.student_id_c) : null,
        subject_c: gradeData.subject_c
      }]
    };

    const response = await apperClient.createRecord('grade_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to create grade:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error creating grade:", error?.response?.data?.message || error);
    return null;
  }
};

export const updateGrade = async (id, gradeData) => {
  try {
    const apperClient = getApperClient();
    
    const payload = {
      records: [{
        Id: id,
        Name: gradeData.Name || `${gradeData.subject_c} - ${gradeData.assignment_c}`,
        assignment_c: gradeData.assignment_c,
        category_c: gradeData.category_c,
        date_c: gradeData.date_c,
        max_score_c: gradeData.max_score_c ? parseFloat(gradeData.max_score_c) : null,
        score_c: gradeData.score_c ? parseFloat(gradeData.score_c) : null,
        student_id_c: gradeData.student_id_c ? parseInt(gradeData.student_id_c) : null,
        subject_c: gradeData.subject_c
      }]
    };

    const response = await apperClient.updateRecord('grade_c', payload);

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to update grade:`, failed);
        return null;
      }
      return response.results[0]?.data;
    }

    return null;
  } catch (error) {
    console.error("Error updating grade:", error?.response?.data?.message || error);
    return null;
  }
};

export const deleteGrade = async (id) => {
  try {
    const apperClient = getApperClient();
    
    const response = await apperClient.deleteRecord('grade_c', {
      RecordIds: [id]
    });

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error(`Failed to delete grade:`, failed);
        return false;
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error deleting grade:", error?.response?.data?.message || error);
    return false;
  }
};