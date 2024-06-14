import VerifyPaymentStatus from "@/components/views/verify-payment";

const ConfirmPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <VerifyPaymentStatus id={id} />
    </section>
  );
};

export default ConfirmPage;
