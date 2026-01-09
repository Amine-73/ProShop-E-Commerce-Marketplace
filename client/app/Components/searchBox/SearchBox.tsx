"use client";
import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
    } else {
      router.push('/');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      sx={{backgroundColor: 'rgba(255,255,255,0.15)', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              px: 2,
              width: { xs: '100%', md: '400px' }  }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 ,color:'white'}}
        placeholder="Search Products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}

      />
      <IconButton type="submit" sx={{ p: '10px', color: '#febd69' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}