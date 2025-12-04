import Contact from "./Contact";

const ContactIndex = async () => {
  const { data: about } = await getAbout();
  return (
    <div>
      <Contact about={about} />
    </div>
  );
};

export default ContactIndex;
