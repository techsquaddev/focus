import { ContactForm, Wrapper } from "@/components";
import { contact } from "@/assets";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Contact = () => {
  return (
    <div>
      <Wrapper>
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-center text-2xl text-text font-bold">
            Contact Us
          </h1>
          <div className="p-5 mt-2 mx-auto md:p-10">
            <img src={contact} alt="contact" className="w-full object-cover" />
          </div>
          <div className="mt-2.5 p-5 mx-5 bg-white border-2 border-secondary rounded-3xl shadow-lg">
            <p className="text-soft-text text-left text-sm md:text-base">
              If you can't find your timetable on FOCUS, don't worry! Just drop
              us an email, and we'll make sure to add your timetable as soon as
              possible. We encourage batch representatives to inform us about
              timetable changes.
            </p>
          </div>
          <ContactForm />
        </div>
      </Wrapper>
    </div>
  );
};

export default Contact;
