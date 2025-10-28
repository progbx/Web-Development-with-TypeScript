import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import App from "../src/App";
import Home from "../src/components/Home";
import About from "../src/components/About";
import Gallery from "../src/components/Gallery";
import NotFound from "../src/components/NotFound";

describe("React Router", () => {
// App component and navigation menu
    describe("App component", () => {
        it('should have a navigation bar with links', () => {
            render(<App />);
            const nav = screen.getByRole('navigation');
            expect(nav).toBeInTheDocument();
        });

        it('should have links to "Home", "About" and "Gallery"', () => {
            render(<App />);
            const nav = screen.getByRole('navigation');
            const { getByText } = within(nav);
    
            const homeLink = getByText(/Home/i);
            const aboutLink = getByText(/About/i);
            const galleryLink = getByText(/Gallery/i);
    
            expect(homeLink).toBeInTheDocument();
            expect(aboutLink).toBeInTheDocument();
            expect(galleryLink).toBeInTheDocument();
        });

        it('link paths should be correct', () => {
            render(<App />);
            const nav = screen.getByRole('navigation');
            const { getByText } = within(nav);
    
            const homeLink = getByText(/Home/i);
            const aboutLink = getByText(/About/i);
            const galleryLink = getByText(/Gallery/i);
    
            expect(homeLink.closest('a')).toHaveAttribute('href', '/');
            expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
            expect(galleryLink.closest('a')).toHaveAttribute('href', '/gallery');
        });
    });
// Home component
    describe("Home component", () => {
        it("should render Home component correctly", () => {
          render(<Home />);
          const element = screen.getByRole("heading");
          expect(element).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", () => {
            render(<Home />);
            const heading = screen.getByRole("heading");
            expect(heading.tagName).toBe("H1");
        });

        it("should contain <h1> element with text 'Welcome to our website!'", () => {
            render(<Home />);
            const heading = screen.getByRole("heading");
            expect(heading.textContent).toBe('Welcome to our website!');
        });
      });

//   About Component
    describe("About component", () => {
        it("should render About component correctly", () => {
          render(<About />);
          const element = screen.getByRole("heading");
          expect(element).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", () => {
            render(<About />);
            const heading = screen.getByRole("heading");
            expect(heading.tagName).toBe("H1");
        });

        it("should contain <h1> element with text 'Learn more about us'", () => {
            render(<About />);
            const heading = screen.getByRole("heading");
            expect(heading.textContent).toBe('Learn more about us');
        });
    });

//  Gallery Component
    describe("Gallery component", () => {
        it("should render Gallery component correctly", () => {
        render(<Gallery />, {wrapper: Router});
        const element = screen.getByRole("heading");
        expect(element).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", () => {
            render(<Gallery />, {wrapper: Router});
            const heading = screen.getByRole("heading");
            expect(heading.tagName).toBe("H1");
        });

        it("should contain <h1> element with text 'Our Photo catalog'", () => {
            render(<Gallery />, {wrapper: Router});
            const heading = screen.getByRole("heading");
            expect(heading.textContent).toBe('Our Photo catalog');
        });
    });
    
//  NotFound Component
    describe("NotFound component", () => {
        it("should render NotFound component correctly", () => {
          render(<NotFound />);
          const element = screen.getByRole("heading");
          expect(element).toBeInTheDocument();
        });

        it("should use <h1> tag for heading", () => {
            render(<NotFound />);
            const heading = screen.getByRole("heading");
            expect(heading.tagName).toBe("H1");
        });

        it("should contain <h1> element with text '404: The page you are looking for cannot be found'", () => {
            render(<NotFound />);
            const heading = screen.getByRole("heading");
            expect(heading.textContent).toBe('404: The page you are looking for cannot be found');
        });
    });

//  Navigation beetwen pages
    describe('Navigation', () => {
        it('home page content appears for default route', async () => {
            render(<App />);
            const component = screen.getByText(/Welcome to our website!/i);
            expect(component).toBeInTheDocument();
            expect(window.location.pathname).toBe('/');

        });

        it('clicking Home link changes path and component', async () => {
            render(<App />);
 
            await userEvent.click(screen.getByText(/Home/i));
            const component = screen.getByText(/Welcome to our website!/i);
            expect(component).toBeInTheDocument();
            expect(window.location.pathname).toBe('/');
        });

        it('clicking About link changes path and component', async () => {
            render(<App />);
 
            await userEvent.click(screen.getByText(/About/i));
            const component = screen.getByText(/Learn more about us/i);
            expect(component).toBeInTheDocument();
            expect(window.location.pathname).toBe('/about');
        });

        it('clicking Gallery link changes path and component', async () => {
            render(<App />);

            await userEvent.click(screen.getByText(/Gallery/i));
            const component = screen.getByText(/Our Photo catalog/i);
            expect(component).toBeInTheDocument();
            expect(window.location.pathname).toBe('/gallery');
        });

        it('clicking Photo link in Gallery page changes path and component', async () => {
            render(<App />);
            await userEvent.click(screen.getByText(/Gallery/i));
            await userEvent.click(screen.getByText(/Paris/i));
            expect(screen.getByText(/Eiffel Tower at sunset/i)).toBeInTheDocument();
            expect(window.location.pathname).toBe('/gallery/2');
        });

        it('invalid path redirects to NotFound component', async () => {
            render(<App />);
            window.history.pushState({}, '', '/unknown');
            render(<App />);
            const component = screen.getByText(/404: The page you are looking for cannot be found/i);
            expect(component).toBeInTheDocument();
            expect(window.location.pathname).toBe('/unknown');
        });
    });

});
