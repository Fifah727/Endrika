import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="empty" role="alert">
        <h2>Oups, quelque chose s'est mal passé</h2>
        <p>{this.props.message ?? "Cette page n'a pas pu s'afficher."}</p>
        <button type="button" className="btn btn--primary" onClick={() => this.setState({ error: null })}>Réessayer</button>
      </div>
    );
  }
}
