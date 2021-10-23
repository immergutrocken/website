interface LabelProps {
  children: string;
  className?: string;
}

const Label = ({ children, className = "" }: LabelProps): JSX.Element => (
  <div className={"text-center " + className}>
    <span className="border-2 border-black rounded-full px-3 pt-2 pb-1 uppercase text-base sm:text-2xl font-important">
      {children}
    </span>
  </div>
);

export default Label;
