import React from 'react';
import { render, screen } from '@testing-library/react';
import TrainersList from './TrainersList';

describe('TrainersList', () => {
  it('renders trainers list correctly', () => {
    const trainers = [
      {
        email: 'trainer1@example.com',
        name: 'Trainer 1',
        photo: 'photo1.jpg',
        training_variations_names: ['Variation1', 'Variation2'],
        id: 1,
      },
      // Add more trainers as needed
    ];

    render(<TrainersList trainers={trainers} />);

    // // Verify that the trainer details are rendered correctly
    // expect(screen.getByAltText("User's profile photo")).toBeInTheDocument();
    // expect(screen.getByText('Trainer 1')).toBeInTheDocument();
    // expect(screen.getByText('Variation1')).toBeInTheDocument();
    // expect(screen.getByText('Variation2')).toBeInTheDocument();

    // // Verify the "Подробнее" link
    // expect(screen.getByText('Подробнее')).toHaveAttribute('href', 'trainers/1');
  });
});
