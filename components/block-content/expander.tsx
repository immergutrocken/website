import Expander from "../shared/expander";
import Content from "./content";

interface BlockExpanderProps {
  node: {
    title: string;
    content: [];
  };
}

const BlockExpander = (props: BlockExpanderProps): JSX.Element => {
  return (
    <div className="font-milona text-xl sm:text-3xl">
      <Expander
        className="max-w-full"
        title={props.node.title}
        iconSize="small"
      >
        <div className="font-content">
          <Content content={props.node.content} />
        </div>
      </Expander>
    </div>
  );
};

export default BlockExpander;
