import { Container } from "@/components/shared/Container";
import ButtonDemo from "@/components/shared/ButtonDemo";
import SignupPage from "@/components/CustomComponents/Signup/SignupPage";
import SignInPage from "@/components/CustomComponents/SignIn/SignInPage";
import { PhotoGallery } from "@/components/CustomComponents/Test/PhotoGallery";
import SignupPage2 from "@/components/CustomComponents/Signup/SignupPage2/SignupPage2";
import SignInPage2 from "@/components/CustomComponents/SignIn/SignInPage2/SignInPage2";
import Navbar from "@/components/CustomComponents/Navbar/Navbar";
import AllPost from "@/components/AllPost";

export default function Home() {
  return (
    <Container>
      <AllPost />
    </Container>
  );
}
