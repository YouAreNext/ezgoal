import { useMutation } from "@vue/apollo-composable";
import CREATE_MUTATION from "./create.graphql";
import GET_MATERIALS from "@/graphql/Material/index.graphql";

const createMaterial = () => {
  const { loading, error, mutate: createMaterial } = useMutation(
    CREATE_MUTATION,
    {
      update: (cache: any, { data: { createMaterial } }: any) => {
        const data = cache.readQuery({ query: GET_MATERIALS });

        cache.writeQuery({
          query: GET_MATERIALS,
          data: {
            ...data,
            materials: [createMaterial, ...data.materials]
          }
        });
        return data;
      }
    }
  );

  return {
    loading,
    error,
    createMaterial
  };
};

export default createMaterial;
