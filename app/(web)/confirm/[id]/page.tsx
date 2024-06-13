import VerifyPaymentStatus from "@/components/views/verify-payment";

const ConfirmPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const id = params.id;

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <VerifyPaymentStatus data={searchParams} id={id} />
    </section>
  );
};

export default ConfirmPage;
