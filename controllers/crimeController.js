const supabase = require('../config/db');

// Submit a Crime Report
const reportCrime = async (req, res) => {
    const { title, description, category, anonymous } = req.body;
    const userId = req.user.id; // Retrieved from authenticated user

    try {
        const { data, error } = await supabase
            .from('crime_reports')
            .insert([{ user_id: userId, title, description, category, anonymous }]);

        if (error) throw error;

        res.status(201).json({ message: 'Crime reported successfully', report: data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Crime Reports (For Admins or Law Enforcement)
const getAllCrimeReports = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('crime_reports')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Crime Reports for a Specific User
const getUserCrimeReports = async (req, res) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('crime_reports')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Crime Report Status (Only Admins or Police)
const updateCrimeStatus = async (req, res) => {
    const { reportId, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('crime_reports')
            .update({ status })
            .eq('id', reportId);

        if (error) throw error;

        res.json({ message: 'Crime report updated', report: data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { reportCrime, getAllCrimeReports, getUserCrimeReports, updateCrimeStatus };
