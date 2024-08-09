import BannerImage from "@/components/views/banner-image";
import ContactUsForm from "@/components/views/contact-us-form";

const ContactPage = () => {
  return (
    <section>
      <BannerImage />
      <div className="flex flex-col p-4 w-full">
        <ContactUsForm />
      </div>
    </section>
  );
};

export default ContactPage;
