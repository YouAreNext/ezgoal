import { useQuery, useResult } from "@vue/apollo-composable";

import MATERIAL_TYPE_QUERY from "@/graphql/Material/types.graphql";

const getOptions = () => {
  const { result } = useQuery(MATERIAL_TYPE_QUERY);
  const options = useResult(result, null, data => data.material_type);

  return options;
};

export default getOptions;
