//чистая оболочка 

import { FormLayout } from '@/shared/ui/formLayout';
import { ServiceSelection } from '@/features/ServiceSelection';

export const ServicePage = () => {
  return (
    <FormLayout 
      stepTitle="Our services" 
      currentStep="Step 2/3"
      onBack={() => console.log('Назад')}
      onNext={() => console.log('Далее')}
    >
      <ServiceSelection /> {/* Передаем контент внутрь через children */}
    </FormLayout>
  );
};