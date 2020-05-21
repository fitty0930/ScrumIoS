package ar.edu.uade.scrumgame.presentation.di.components;

import ar.edu.uade.scrumgame.presentation.di.PerActivity;
import ar.edu.uade.scrumgame.presentation.di.modules.ActivityModule;
import ar.edu.uade.scrumgame.presentation.di.modules.LevelModule;
import ar.edu.uade.scrumgame.presentation.view.fragment.*;
import dagger.Component;

@PerActivity
@Component(dependencies = ApplicationComponent.class, modules = {ActivityModule.class, LevelModule.class})
public interface LevelComponent extends ActivityComponent {
    void inject(MenuFragment menuFragment);

    void inject(LevelFragment levelFragment);

    void inject(InfoTheoryFragment infoTheoryFragment);

    void inject(InfoGameFragment infoGameFragment);

    void inject(GameFragment gameFragment);

    void inject(SignupFragment signupFragment);

    void inject(SignupDetailsFragment signupDetailsFragment);

    void inject(LoginFragment loginFragment);

    void inject(ProfileFragment profileFragment);
}
