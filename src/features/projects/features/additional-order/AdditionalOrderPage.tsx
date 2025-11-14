import { useState, useEffect } from 'react';
import { ProcedureSidebar } from '@/components/ProcedureSidebar';
import { StepNavigation } from '@/components/StepNavigation';
import { useProcedure } from '@/hooks/useProcedure';
import { additionalOrderSteps } from './data/additionalOrderSteps';
import { OrderInfoStep } from './components/OrderInfoStep';
import { SignatureStep } from '@/components/SignatureStep';

export const AdditionalOrderPage = () => {
  const {
    steps,
    currentStep,
    currentStepIndex,
    goToStep,
    nextStep,
    previousStep,
    canGoNext: baseCanGoNext,
    canGoPrevious,
  } = useProcedure(additionalOrderSteps);

  const [orderData, setOrderData] = useState({
    orderAmount: '',
    summary: '',
  });
  const [hasSignature, setHasSignature] = useState(false);

  // localStorageから注文データを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem('additionalOrderData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setOrderData({
          orderAmount: parsed.orderAmount || '',
          summary: parsed.summary || '',
        });
      } catch (e) {
        console.error('Failed to parse additional order data', e);
      }
    }
  }, []);

  // バリデーション: 署名ステップでは署名が必要
  const isSignatureValid = hasSignature;

  // 現在のステップに応じてcanGoNextを決定
  const canGoNext = (() => {
    if (!baseCanGoNext) return false;
    if (currentStep.id === 'signature') {
      return isSignatureValid;
    }
    return true;
  })();

  const handleNext = () => {
    if (currentStepIndex === steps.length - 1) {
      // 最後のステップの場合は完了処理
      handleComplete();
    } else {
      nextStep();
    }
  };

  const handleComplete = () => {
    // TODO: 追加注文手続きの完了処理
    console.log('追加注文手続きを完了しました', { orderData, hasSignature });
    // 完了後の処理（例: 親ウィンドウに通知、ページを閉じるなど）
    alert('追加注文手続きが完了しました');
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case 'order-info':
        return <OrderInfoStep orderData={orderData} onOrderDataChange={setOrderData} />;
      case 'signature':
        return (
          <SignatureStep 
            hasSignature={hasSignature} 
            onSignatureChange={setHasSignature}
            title="署名"
            description="追加注文の署名を行います。"
          />
        );
      default:
        return <OrderInfoStep orderData={orderData} onOrderDataChange={setOrderData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProcedureSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepClick={goToStep}
        title="追加注文手続き"
      />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            {renderStep()}
            <StepNavigation
              onPrevious={previousStep}
              onNext={handleNext}
              canGoPrevious={canGoPrevious}
              canGoNext={canGoNext}
              nextLabel={currentStepIndex === steps.length - 1 ? '完了' : '次へ'}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

