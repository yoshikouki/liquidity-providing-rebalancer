import DefaultLayout from "@/components/DefaultLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="container py-8 px-4 my-8 mx-auto max-w-md rounded-2xl prose bg-base-content">
        <h2 className="text-primary-content">Who would you like to thanks?</h2>
        <div className="w-full form-control">
          <label className="input-group">
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address or ENS domain"
              className="w-full input"
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </label>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
