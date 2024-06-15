export const InputForm = ({
  field,
  placeholder,
  icon: Icon,
}: {
  field: any;
  placeholder: string;
  icon: any;
  others?: any;
}) => {
  return (
    <div className="grid grid-cols-7 justify-start items-center border border-gray-300 rounded-md">
      <Icon className="w-10 h-10 p-2 text-black bg-gray-200 rounded-l-md col-span-1" />
      <input
        {...field}
        required
        type="text"
        className="outline-none px-1 col-span-6"
        placeholder={placeholder}
      />
    </div>
  );
};
