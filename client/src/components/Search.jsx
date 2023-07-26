import React from 'react'
import { Box, InputBase, Toolbar, Button } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

  const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

//rachel to cross check this with canvas
function Search({handleSearch, search}) {

function handleChange(e) {
      handleSearch(e.target.value)
  }

  return (
//     <div className="ui search"> 
//         <div className="ui icon input">
//         <label htmlFor="Search"> Find a Hike:</label>
//         <input
//             value={search}
//             type="text"
//             id="search"
//             placeholder="Search by city, or by park..."
//             onChange={(e) => handleChange(e)}
//         />
//         <button><svg width="24" height="24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M16.473 17.887A9.46 9.46 0 0 1 10.5 20a9.5 9.5 0 1 1 9.5-9.5 9.46 9.46 0 0 1-2.113 5.973l5.32 5.32a1 1 0 0 1-1.414 1.414l-5.32-5.32ZM18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" fill="#2B381F"></path></svg></button>
// </div>
//     </div>

    // <Box
    // sx={{
    //   backgroundColor: 'primary.dark',
    //   '&:hover': {
    //     backgroundColor: 'primary.main',
    //     opacity: [0.9, 0.8, 0.7],
    //   },
    // }}>
   
        <SearchBar>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                type="text"
                id="search"
                onChange={(e) => handleChange(e)}
              />
        </SearchBar>
    // </Box>
    )
  }
  
  export default Search
  {/* <Button sx={2}>GO!</Button> */}