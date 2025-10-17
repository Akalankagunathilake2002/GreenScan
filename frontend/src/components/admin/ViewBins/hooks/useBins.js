import { useState, useEffect, useCallback } from "react";
import { binService } from "../../../../services/binService";

export const useBins = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBins = useCallback(async () => {
    setLoading(true);
    try {
      const data = await binService.getAll();
      setBins(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBin = async (bin) => {
    const newBin = await binService.create(bin);
    setBins((prev) => [...prev, newBin]);
  };

  const updateBin = async (id, bin) => {
    const updated = await binService.update(id, bin);
    setBins((prev) => prev.map((b) => (b._id === id ? updated : b)));
  };

  const deleteBin = async (id) => {
    await binService.remove(id);
    setBins((prev) => prev.filter((b) => b._id !== id));
  };

  useEffect(() => {
    fetchBins();
  }, [fetchBins]);

  return { bins, loading, addBin, updateBin, deleteBin };
};
