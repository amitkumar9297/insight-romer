import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

// Styled components for responsiveness and aesthetics
const Section = styled("section")({
  padding: "2rem 2rem",
  // backgroundColor: "#f5f5f5",
  textAlign: "center",
});

const ServiceCard = styled(Paper)({
  padding: "2rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  textAlign: "center",
  height: "300px", // Fixed height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const services = [
  {
    title: "Blog Creation",
    description:
      "Easily create and publish engaging blog posts with our intuitive editor. Customize your posts with images, tags, and categories to reach your audience effectively.",
    imageUrl:
      "https://img.freepik.com/premium-vector/content-writer-journalist-background-vector-illustration-copy-writing-research-development-idea-novel-book-script-flat-style_2175-1045.jpg",
  },
  {
    title: "User Profiles",
    description:
      "Build and manage your personal profile with ease. Showcase your bio, profile picture, and blog posts to connect with readers and fellow bloggers. Enhance your presence effortlessly.",
    imageUrl:
      "https://i.pinimg.com/736x/e2/67/6b/e2676b81dbed0ac9bf854da99483c781.jpg",
  },
  {
    title: "Comment System",
    description:
      "Engage with your audience through our robust comment system. Readers can leave feedback, ask questions, and participate in discussions on your blog posts.",
    imageUrl:
      "https://i0.wp.com/www.thewebhospitality.com/wp-content/uploads/2022/09/Blog-Commenting-Sites-List.png?fit=1300%2C700&ssl=1",
  },
  {
    title: "Analytics",
    description:
      "Track the performance of your blog posts with detailed analytics. Gain insights into views, likes, and comments to optimize your content strategy.",
    imageUrl:
      "https://t4.ftcdn.net/jpg/03/09/43/21/360_F_309432181_gJfSocsIO8Aowc0oTIGEhnSYOLpsafZ6.jpg",
  },
  {
    title: "Responsive Design",
    description:
      "Enjoy a seamless reading experience across all devices. Our platform ensures that your blog looks great on desktops, tablets, and smartphones.",
    imageUrl:
      "https://brandlume.com/wp-content/uploads/2021/04/responsive-web-design.jpeg",
  },
  {
    title: "SEO Optimization",
    description:
      "Optimize your blog posts for search engines with built-in SEO tools. Improve your visibility and attract more readers with effective SEO strategies.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQBFDguPKPSD3lX3X5LftxohrCiceXovD-QMGR4AiPC6ldkUnrE3OpvxYEocbQR415L4&usqp=CAU",
  },
];

const Services = () => {
  return (
    <Section>
      <Container>
        <Typography variant="h3">Our Services</Typography>
        <Typography variant="h6" mt={1}>
          Explore the range of services we offer to enhance your blogging
          experience:
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={2}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard>
                <Typography variant="h5" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {service.description}
                </Typography>
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </ServiceCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Services;
