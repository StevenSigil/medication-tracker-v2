import React, { useState, useRef } from "react";
import { Button, Image, Tooltip, Overlay } from "react-bootstrap";

import GithubLogo from "../public/static/media/GitHub-Mark-32px.png";
import LinkedinLogo from "../public/static/media/linkedin.svg";
import EmailLogo from "../public/static/media/envelope-fill.svg";

// styles from main.css

export default function Footer() {
  const [showPopover, setShowPopover] = useState(false);
  const target = useRef(null);

  function copyEmail() {
    var copyText = "stevensigil@protonmail.com";
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = copyText;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    setShowPopover(true);
  }

  return (
    <footer className="footer">
      {/* <Container className="footer-container"> */}
        <p>Need an application built? Reach out to me!</p>
      {/* </Container>
      <Container className="footer-container"> */}
        <Button
          className="github-btn"
          type="link"
          href="https://github.com/StevenSigil"
          rel="noreferrer"
          target="_blank"
          variant="outline-light"
        >
          <Image
            src={GithubLogo}
            width="100%"
            height="100%"
            alt="Github logo"
          />
        </Button>

        <Button
          className="github-btn"
          type="link"
          href="https://www.linkedin.com/in/stevensigil"
          rel="noreferrer"
          target="_blank"
          variant="outline-light"
        >
          <Image
            src={LinkedinLogo}
            height="100%"
            width="100%"
            alt="Linkedin Logo"
          />
        </Button>

        <Button
          className="github-btn"
          type="link"
          href="mailto:steven.sigil@protonmail.com"
          rel="noreferrer"
          ref={target}
          target="_blank"
          variant="outline-light"
          onClick={copyEmail}
        >
          <Image
            src={EmailLogo}
            height="100%"
            width="100%"
            alt="Linkedin Logo"
          />
        </Button>
      {/* </Container> */}
      <Overlay
        transition={false}
        target={target.current}
        show={showPopover}
        placement="right"
      >
        <Tooltip id="email-popover" onClick={() => setShowPopover(false)}>
          <p>Email address has been copied to your clipboard.</p>{" "}
          <small>Click to close</small>
        </Tooltip>
      </Overlay>
    </footer>
  );
}
