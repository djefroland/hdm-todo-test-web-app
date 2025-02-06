import { Check, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Snackbar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [ tasks, setTasks ] = useState<Task[]>([]);
  const [ newTaskName, setNewTaskName ] = useState<string>('');
  const [ notification, setNotification ] = useState<string | null>(null);

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    await handleFetchTasks();
    setNotification('Tâche supprimée');
  };

  const handleSave = async (task: Task) => {
    if (task.name.trim() === '') return;
    await api.patch(`/tasks/${task.id}`, { name: task.name });
    await handleFetchTasks();
    setNotification('Tâche mise à jour');
  };

  const handleAdd = async () => {
    if (newTaskName.trim()) {
      await api.post('/tasks', { name: newTaskName });
      await handleFetchTasks();
      setNewTaskName('');
      setNotification('Tâche ajoutée');
    }
  };

  const handleEdit = (id: number, name: string) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, name } : task));
    setTasks(updatedTasks);
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box key={task.id} display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%">
            <TextField
              size="small"
              value={task.name}
              onChange={(e) => handleEdit(task.id, e.target.value)}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                disabled={task.name.trim() === ''}
                onClick={() => handleSave(task)}
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1}>
          <TextField
            size="small"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Nouvelle tâche"
            fullWidth
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={handleAdd}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={!!notification}
        color="success"
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        message={notification}
      />
    </Container>
  );
};

export default TodoPage;
