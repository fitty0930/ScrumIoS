import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.Timer;

public class Cronometro extends javax.swing.JFrame {

    public Cronometro(){
        setLocationRelativeTo(null); // con esto defino a que se centra el timer
        timer= new Timer(10, acciones); // tiempo en milisegundos, acciones a ejecutar
    }

    private Timer timer;
    private String actual_time;
    private int hora, minutos, segundos, centseg;
    private ActionListener acciones = new ActionListener() {
        @Override
        public void actionPerformed(ActionEvent e) {
            centseg++;
            if(centseg==100){
                centseg=0;
                ++segundos;
            }
            if(segundos==60){
                segundos=0;
                ++minutos;
            }
            if(minutos==60){
                minutos=0;
                ++hora;
            }
            actual_time =  actualizarLabel();
        }
    };

    private String actualizarLabel() {
        String tiempo = (hora<=9?"0":"")+hora+":"+(minutos<=9?"0":"")+minutos+":"+(segundos<=9?"0":"")+segundos+":"+(centseg<=9?"0":"")+centseg;
        System.out.println(tiempo);// reemplazar por espaciodondevaeltiempo.poner(tiempo)
        return tiempo;
    }

    public void startTime(){
        timer.start();
    }

    public String stopTime(){
        timer.stop();
        return this.actual_time;
    }

    public static void main(String args[]) {
        /* Set tuihe Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(Cronometro.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(Cronometro.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(Cronometro.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(Cronometro.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                new Cronometro().startTime();
            }
        });
    }
}
