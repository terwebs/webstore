import { useNavigation } from "react-router-dom";

export default function SubmitButton({ text }) {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      className="btn btn-primary btn-block my-1 rounded-xl"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text
      )}
    </button>
  );
}
