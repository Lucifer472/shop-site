import VerifyPaymentStatus from "@/components/views/verify-payment";

const ConfirmPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) => {
  const id = params.id;

  const title = searchParams.title;

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <VerifyPaymentStatus id={id} title={title} />
    </section>
  );
};

export default ConfirmPage;
