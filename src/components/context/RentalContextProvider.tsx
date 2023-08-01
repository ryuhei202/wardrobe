import { createContext } from "react";
import { useParams } from "react-router-dom";

export type TRentalContext = {
  rentalId: number;
};

export const RentalIdContext = createContext<TRentalContext>({
  rentalId: 0,
});

type TProps = {
  children: React.ReactNode;
};

export const RentalContextProvider = ({ children }: TProps) => {
  const { rentalId } = useParams();

  return (
    <RentalIdContext.Provider value={{ rentalId: Number(rentalId) }}>
      {children}
    </RentalIdContext.Provider>
  );
};
