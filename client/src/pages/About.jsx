import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  Link,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled components for responsiveness and aesthetics
const Section = styled("section")({
  padding: "4rem 2rem",
  backgroundColor: "#ffffff",
  textAlign: "center",
});

const FounderPaper = styled(Paper)({
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "auto",
});

const FounderAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  marginBottom: "1rem",
});

const About = () => {
  return (
    <Section>
      <Container>
        <Typography variant="h3" gutterBottom>
          About Insight Romer
        </Typography>
        <Typography variant="h5" gutterBottom>
          What is Insight Romer?
        </Typography>
        <Typography variant="body1" paragraph>
          Insight Romer is an innovative platform that aims to bridge the gap
          between knowledge seekers and content creators. We believe in the
          power of shared wisdom and diverse perspectives. Our platform serves
          as a hub for insightful and thought-provoking content, allowing users
          to explore various topics ranging from technology and science to
          personal development and beyond.
        </Typography>
        <Typography variant="body1" paragraph>
          At Insight Romer, we are committed to providing a space where
          high-quality content can thrive. Our user-friendly interface and
          engaging features ensure that both readers and contributors have a
          seamless experience. Whether you're here to gain new insights or share
          your own expertise, Insight Romer is designed to support and inspire
          you.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to foster a vibrant community of learners and thinkers.
          We encourage collaboration and dialogue, creating opportunities for
          meaningful connections and growth. Join us in our journey to make
          knowledge accessible and impactful for everyone.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Meet the Founder
        </Typography>
        <FounderPaper>
          <FounderAvatar
            src="https://avatars.githubusercontent.com/u/103363472?v=4"
            alt="Amit Kumar"
          />
          <Typography variant="h6" gutterBottom>
            Amit Kumar
          </Typography>
          <Typography variant="body2" paragraph>
            Amit Kumar, the visionary behind Insight Romer, has a passion for
            technology and knowledge sharing. With a background in [relevant
            field/experience], Amit founded Insight Romer to create a platform
            where innovative ideas and valuable insights can be shared with a
            global audience.
          </Typography>
          <Box mt={2}>
            <Link
              href="https://github.com/amitkumar9297"
              target="_blank"
              rel="noopener"
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                GitHub
              </Button>
            </Link>
            <Link
              href="https://linkedin.com/in/amitkumar9297"
              target="_blank"
              rel="noopener"
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                LinkedIn
              </Button>
            </Link>
            <Link
              href="https://leetcode.com/amitkumar9297/"
              target="_blank"
              rel="noopener"
            >
              <Button variant="contained" color="primary">
                LeetCode
              </Button>
            </Link>
          </Box>
        </FounderPaper>
      </Container>
    </Section>
  );
};

export default About;
