import styles from "./loading-out.module.css";

export default function MealsLoadingPage() {
  return <p className={styles.loading}>Fetching meals...</p>;
}

/**
 * Non usiamo questo file - per usarlo basta spostarlo nella cartella app e cambiare il nome in loading.js
 * Nuovo metodo in meals/page.js
 */
