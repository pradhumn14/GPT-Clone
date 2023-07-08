// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   useTheme,
//   useMediaQuery,
//   TextField,
//   Button,
//   Alert,
//   Collapse,
// } from "@mui/material";

// const Summary = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   //media
//   const isNotMobile = useMediaQuery("(min-width: 1000px)");
//   // states
//   const [text, setText] = useState("");
//   const [summary, setSummary] = useState("");
//   const [error, setError] = useState("")

//   //register ctrl
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await axios.post("/api/v1/openai/summaryz", { text });
//         console.log(data);
//         setSummary(data);
//     } catch (err) {
//       console.log(error);
//       if (err.response.data.error) {
//         setError(err.response.data.error);
//       } else if (err.message) {
//         setError(err.message);
//       }
//       setTimeout(() => {
//         setError("");
//       }, 5000);
//     }
//   };
//   return (
//     <Box
//       width={isNotMobile ? "40%" : "80%"}
//       p={"2rem"}
//       m={"2rem auto"}
//       borderRadius={5}
//       sx={{ boxShadow: 5 }}
//       backgroundColor={theme.palette.background.alt}
//     >
//       <Collapse in={error}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       </Collapse>
//       <form onSubmit={handleSubmit}>
//         <Typography variant="h3">Summarise Text</Typography>

//         <TextField
//           placeholder="add your text"
//           type="text"
//           required
//           margin="normal"
//           fullWidth
//           value={text}
//           onChange={(e) => {
//             setText(e.target.value);
//           }}
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           size="large"
//           sx={{ color: "white", mt: 2 }}
//         >
//           Submit
//         </Button>
//         <Typography mt={2}>
//           Not this tool ? <Link to="/">GO Back</Link>
//         </Typography>
        
//       </form>
//     </Box>
//   );
// };

// export default Summary;
