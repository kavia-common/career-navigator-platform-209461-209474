import { useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export default function RoleSelector({ value, onChange }) {
  /** Allows selecting a role from backend roles list. Falls back to sample roles if backend unavailable. */
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getRoles();
        if (active) setRoles(data || []);
      } catch {
        if (active) {
          setRoles([
            { id: 'se', name: 'Software Engineer' },
            { id: 'sre', name: 'Site Reliability Engineer' },
            { id: 'pm', name: 'Product Manager' }
          ]);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  return (
    <Autocomplete
      fullWidth
      options={roles}
      loading={loading}
      getOptionLabel={(opt) => opt?.name ?? ''}
      value={value}
      onChange={(e, newVal) => onChange?.(newVal)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Target Role"
          placeholder="Choose a role"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={18} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
}
