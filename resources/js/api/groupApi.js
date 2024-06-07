export const updateGroups = async () => {
    try {
        const response = await axios.get('/api/update-groups', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.response;
    } catch (error) {
        console.error('Error updating groups:', error);
        throw error;
    }
};

export const getGroups = async () => {
    return axios.get('/api/groups')
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};


export const addGroup = async (name) => {
    const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        throw new Error('Failed to add group');
    }
    return response.json();
};

export const editGroup = async (id, newName) => {
    const response = await fetch(`/api/groups/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    });

    if (!response.ok) {
        throw new Error('Failed to update group');
    }
    return response.json();
};

export const deleteGroup = async (id) => {
    const response = await fetch(`/api/groups/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete group');
    }
    return response.json();
};

export const getStudentsByGroup = async (id) => {
    return axios.get(`/api/users?group_id=${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return response.data;
    });
};
