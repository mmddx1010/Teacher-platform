const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    const studentSelect = document.getElementById('studentSelect');
    const parentForm = document.getElementById('parentForm');

    // 1. جلب قائمة الطالبات من قاعدة البيانات وتعبئة القائمة المنسدلة
    async function loadStudents() {
        try {
            const response = await fetch(`${API_URL}/students`);
            const students = await response.json();

            if (studentSelect) {
                studentSelect.innerHTML = '<option value="">-- حدد اسم الطالبة --</option>';
                students.forEach(student => {
                    const option = document.createElement('option');
                    option.value = student.student_id;
                    option.textContent = student.full_name;
                    studentSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('خطأ في جلب الطالبات:', error);
        }
    }

    // 2. إرسال الملاحظة وحفظها في قاعدة البيانات عبر API
    if (parentForm) {
        parentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const student_id = studentSelect.value;
            const message_type = document.getElementById('messageType').value;
            const message_text = document.getElementById('messageText').value;

            try {
                const response = await fetch(`${API_URL}/parent-messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ student_id, message_type, message_text })
                });

                const data = await response.json();

                if (data.success) {
                    alert('تم حفظ الرسالة وإرسالها لولي الأمر بنجاح!');
                    parentForm.reset();
                } else {
                    alert('حدث خطأ أثناء الإرسال.');
                }
            } catch (error) {
                console.error('خطأ في الاتصال بالسيرفر:', error);
                alert('تعذر الاتصال بالسيرفر.');
            }
        });
    }

    loadStudents();
});