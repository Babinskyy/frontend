import { Box, Typography, Button } from "@mui/material";
import CustomInput from "../components/common/CustomInput";
import { IoIosLogIn } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypingAnimation from "../components/typer/TypingAnimation";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing up...", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Sign up success!", { id: "signup" });
    } catch (error) {
      console.error(error);
      toast.error("Sign up failed.", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      display={"flex"}
      flex={{ xs: 1, md: 0.5 }}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={2}
      mt={16}
    >
      <Box>
        <Typography
          style={{
            fontSize: "60px",
            color: "white",
            display: "inline-block",
            textShadow: "1px 1px 20px #000",
          }}
        >
          Ask me about
        </Typography>
        <br />
        <TypingAnimation />
      </Box>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "30px",
          boxShadow: "3px 3px 15px rgb(21 21 21)",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#2f2f2f",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h4" textAlign="center" fontWeight={600}>
            Signup
          </Typography>
          <CustomInput type="text" name="name" label="Name" />
          <CustomInput type="email" name="email" label="Email" />
          <CustomInput type="password" name="password" label="Password" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              width: "400px",
              borderRadius: 2,
              bgcolor: "rgb(81, 83, 143)",
              color: "white",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
            endIcon={<IoIosLogIn />}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default Signup;