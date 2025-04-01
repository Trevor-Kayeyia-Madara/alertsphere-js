const supabase = require('../config/db');

// Report a Missing Person
const reportMissingPerson = async (req, res) => {
    const { name, age, last_seen, description, anonymous } = req.body;
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('missing_persons')
            .insert([{ user_id: userId, name, age, last_seen, description, anonymous }]);

        if (error) throw error;

        res.status(201).json({ message: 'Missing person reported successfully', report: data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Missing Person Reports
const getAllMissingPersons = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('missing_persons')
            .select('*');

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Missing Persons Reported by a Specific User
const getUserMissingPersons = async (req, res) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('missing_persons')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Missing Person Status (Only Admins or Police)
const updateMissingPersonStatus = async (req, res) => {
    const { reportId, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('missing_persons')
            .update({ status })
            .eq('id', reportId);

        if (error) throw error;

        res.json({ message: 'Missing person status updated', report: data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { reportMissingPerson, getAllMissingPersons, getUserMissingPersons, updateMissingPersonStatus };
