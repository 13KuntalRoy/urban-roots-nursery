import * as React from "react";
import TreeCard, { Tree } from "@/components/TreeCard";
import { useQuery } from "@tanstack/react-query";
import { fetchTrees } from "@/api/nursery";

// Static fallback trees removed in favor of API data

// Fallback trees moved inside component if needed or removed

interface TreeCatalogProps {
  whatsappNumber: string;
}

const TreeCatalog: React.FC<TreeCatalogProps> = ({ whatsappNumber }) => {
  const { data: trees, isLoading, error } = useQuery({ queryKey: ["trees"], queryFn: fetchTrees });

  if (isLoading) return <div className="text-center py-10">Loading our collection...</div>;
  if (error) return <div className="text-center py-10 text-destructive">Failed to load trees. Please try again later.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trees?.map((tree: Tree, i: number) => (
        <TreeCard key={tree.id} tree={tree} whatsappNumber={whatsappNumber} index={i} />
      ))}
    </div>
  );
};

export default TreeCatalog;
