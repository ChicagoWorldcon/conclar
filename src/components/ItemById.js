import { useStoreState } from "easy-peasy";
import { useParams } from "react-router-dom";
import ProgramList from "./ProgramList";

const ItemById = () => {
  const params = useParams();
  const program = useStoreState((state) => state.program);
  if (program.length === 0) return <></>;

  // Filter to select only the specified ID.
  const filteredProgram = program.filter(
    (item) => item.id.toString() === params.id
  );
  return <ProgramList program={filteredProgram} forceExpanded={true} />;
};

export default ItemById;
