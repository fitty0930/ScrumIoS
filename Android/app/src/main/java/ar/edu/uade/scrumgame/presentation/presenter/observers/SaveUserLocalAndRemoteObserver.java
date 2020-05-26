package ar.edu.uade.scrumgame.presentation.presenter.observers;

import ar.edu.uade.scrumgame.R;
import ar.edu.uade.scrumgame.domain.Progress;
import ar.edu.uade.scrumgame.domain.interactor.*;
import ar.edu.uade.scrumgame.presentation.mapper.UserDataMapper;
import ar.edu.uade.scrumgame.presentation.models.ProgressModel;
import ar.edu.uade.scrumgame.presentation.models.UserOverallDataModel;
import ar.edu.uade.scrumgame.presentation.presenter.SignUpBasePresenter;
import ar.edu.uade.scrumgame.presentation.view.SignUpBaseView;

import java.util.List;

public class SaveUserLocalAndRemoteObserver extends DefaultObserver<String> {
    private SaveUserOverallData saveUserOverallDataUseCase;
    private SaveProgressList saveProgressListUseCase;
    private SignUpBasePresenter signUpPresenter;
    private SignUpBaseView signUpView;
    private UserDataMapper userDataMapper;
    private List<ProgressModel> initialProgress;

    public SaveUserLocalAndRemoteObserver(SaveUserOverallData saveUserOverallDataUseCase, SaveProgressList saveProgressListUseCase, SignUpBasePresenter signUpPresenter, SignUpBaseView signUpView, UserDataMapper userDataMapper, List<ProgressModel> initialProgress) {
        this.saveUserOverallDataUseCase = saveUserOverallDataUseCase;
        this.saveProgressListUseCase = saveProgressListUseCase;
        this.signUpPresenter = signUpPresenter;
        this.signUpView = signUpView;
        this.userDataMapper = userDataMapper;
        this.initialProgress = initialProgress;
    }

    @Override
    public void onNext(String saveUserOutcome) {
        switch (saveUserOutcome) {
            case SaveUserLocalAndRemote.USER_SAVE_OUTCOMES.COMPLETE:
            case SaveUserLocalAndRemote.USER_SAVE_OUTCOMES.FAILED_REMOTE:
                saveUserOverallDataUseCase.execute(new DefaultObserver<Void>() {
                    @Override
                    public void onComplete() {
                        saveProgressListUseCase.execute(new DefaultObserver<String>() {
                            @Override
                            public void onNext(String saveProgressOutcome) {
                                switch (saveProgressOutcome) {
                                    case SaveProgress.PROGRESS_SAVE_OUTCOMES.COMPLETE:
                                        signUpPresenter.hideViewLoading();
                                        signUpView.enterMenu();
                                        break;
                                    case SaveProgress.PROGRESS_SAVE_OUTCOMES.FAILED_REMOTE:
                                        signUpPresenter.hideViewLoading();
                                        signUpView.showError(signUpView
                                                .context().getString(R.string.error_saving_remote_data));
                                        signUpView.returnToLogin();
                                        break;
                                    default:
                                        signUpPresenter.hideViewLoading();
                                        signUpView.showError(signUpView
                                                .context().getString(R.string.unknown_error));
                                        signUpPresenter.showViewRetry();
                                }
                            }

                            @Override
                            public void onError(Throwable exception) {
                                signUpPresenter.hideViewLoading();
                                signUpView.showError(signUpView.context().getString(R.string.error_saving_progress));
                                signUpPresenter.showViewRetry();
                            }
                        }, (List<Progress>) userDataMapper.progressModelToProgress(initialProgress));
                    }

                    @Override
                    public void onError(Throwable exception) {
                        signUpPresenter.hideViewLoading();
                        signUpView.showError(signUpView
                                .context().getString(R.string.unknown_error));
                        signUpPresenter.showViewRetry();
                    }
                }, userDataMapper.userOverallDataModelToUserOverallData(
                        new UserOverallDataModel(1)));
                break;
            default:
                signUpPresenter.hideViewLoading();
                signUpView.showError(signUpView.context().getString(R.string.unknown_error));
                signUpPresenter.showViewRetry();
                break;
        }
    }

    @Override
    public void onError(Throwable exception) {
        signUpPresenter.hideViewLoading();
        signUpView.showError(signUpView.context().getString(R.string.error_saving_user));
        signUpPresenter.showViewRetry();
    }
}
